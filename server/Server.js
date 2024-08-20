const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

var totalScore=0;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});


const patientCases = [
    {
        patient: {
            age: 60,
            gender: 'Male',
            history: 'Smoking',
            symptoms: 'Persistent cough, unintentional weight loss',
            additionalInfo: 'Mass in the upper lobe of the right lung (from X-ray)'
        },
        correctTest: 'X-ray',
        correctDiagnosis: 'Lung cancer'
    }
];

// Helper functions
const calculateScore = (isCorrect, attempts) => {
    const maxScore = 5;
    return isCorrect ? Math.max(maxScore - (attempts - 1), 0) : 0;
};




const getOpenAIResponse = async (prompt, functions) => {
    try {
        console.log('Sending request to OpenAI with prompt:', prompt);
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'system', content: prompt }],
            functions: functions,
        });

        return response.choices[0].message;
    } catch (error) {
        console.error("Error getting OpenAI response:", error);
        throw error;
    }
};

let currentCaseIndex = 0;
let attempts = 0;

var diagnosis = "";
io.on('connection', (socket) => {
    console.log('A user connected');

    const currentCase = patientCases[currentCaseIndex];

    // Initial messages
    socket.emit('message', { sender: 'system', text: "Hi, Dr. Shrey. Good to see you." });

    socket.emit('message', { sender: 'system', text: "I've been having a persistent cough lately, and I've noticed I'm losing weight without trying. I'm a bit concerned because I've been a smoker for many years." });

    socket.emit('message', {
        sender: 'seniorDoctor',
        text: `The patient is a ${currentCase.patient.age}-year-old ${currentCase.patient.gender} with a history of ${currentCase.patient.history}. They present with ${currentCase.patient.symptoms}. These symptoms warrant further investigation. Let's go to the lab to diagnose further. What test should we run?`
    });

     
    socket.on('message', async (msg) => {
       
        console.log('once');
        attempts++;
        if (socket.waitingForDiagnosis) {
            handleDiagnosisResponse(socket, diagnosis, msg.text, currentCase);
        } else {

        const functions = [
            {
                name: "checkTest",
                description: "Function to check if the selected test is correct",
                parameters: {
                    type: "object",
                    properties: {
                        test: {
                            type: "string",
                            description: "The test selected by the doctor",
                        }
                    },
                    required: ["test"],
                }
            },
            {
                name: "checkDiagnosis",
                description: "Function to check if the diagnosis is correct",
                parameters: {
                    type: "object",
                    properties: {
                        diagnosis: {
                            type: "string",
                            description: "The diagnosis made by the doctor",
                        }
                    },
                    required: ["diagnosis"],
                }
            }
        ];

        try {
            const prompt = `The patient is a ${currentCase.patient.age}-year-old ${currentCase.patient.gender} with a history of ${currentCase.patient.history}. Symptoms: ${currentCase.patient.symptoms}. Additional info: ${currentCase.patient.additionalInfo}. The doctor's input is: ${msg.text} give me the one test he/she should get done and one diagnosis, answer should be in one line json format`;

            const aiResponse = await getOpenAIResponse(prompt, functions);
            if (aiResponse) {
                const data = JSON.parse(aiResponse.content);
                const test = data.test;
                diagnosis = data.diagnosis;
                handleTestResponse(socket, test,msg.text,  currentCase);
            } else {
                console.error("Unexpected AI response structure:", aiResponse);
                socket.emit('message', {
                    sender: 'seniorDoctor',
                    text: "I'm not sure how to interpret that. Could you please rephrase or be more specific?"
                });
            }
        } catch (error) {
            console.error("Error processing message:", error);
            socket.emit('message', {
                sender: 'seniorDoctor',
                text: "Sorry, there was an issue processing your request. Please try again."
            });
        }
    }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

function handleTestResponse(socket, test, currentCase, currentPatientCase) {

    if ((test.toLowerCase() === currentCase.toLowerCase()) || (currentCase.toLowerCase()===currentPatientCase.correctTest.toLowerCase())) {
       
        socket.emit('message', {
            sender: 'seniorDoctor',
            text: `Great choice, Doctor! Here are the results from the ${currentCase}:`
        });
        socket.emit('message', {
            sender: 'seniorDoctor',
            text: `🩻 ${currentCase.toUpperCase()} Shows ${currentPatientCase.patient.additionalInfo}. What is the differential diagnosis we should be considering?`
        });
        socket.emit('updateScore', { totalScore });

        socket.waitingForDiagnosis = true;
        const testScore = calculateScore(true, attempts);
       totalScore +=testScore;
        attempts = 0;
    } else {
        socket.emit('message', {
            sender: 'seniorDoctor',
            text: `I'm not sure ${currentCase} is the best choice here. Let's think about this further. What test might give us the most relevant information given the patient's symptoms?`
        });
    }
}

function handleDiagnosisResponse(socket, diagnosisGiven, currentCase, currentPatientCase) {
    console.log(`Checking diagnosis: ${diagnosisGiven}`);
    if ((diagnosisGiven.toLowerCase() === currentCase.toLowerCase() )|| (currentPatientCase.correctDiagnosis.toLowerCase() == currentCase.toLowerCase()) ) {
        const diagnosisScore = calculateScore(true, attempts);
        totalScore+=diagnosisScore;
       
        socket.emit('updateScore', { totalScore });

        socket.emit('message', {
            sender: 'seniorDoctor',
            text: `Correct! The diagnosis is indeed ${currentCase}. You scored ${totalScore} points for the diagnosis.`
        });

        currentCaseIndex++;

        if (currentCaseIndex < patientCases.length) {
            const nextCase = patientCases[currentCaseIndex];
            socket.emit('message', {
                sender: 'seniorDoctor',
                text: `Let's move on to our next patient. Age: ${nextCase.patient.age}, Gender: ${nextCase.patient.gender}, History: ${nextCase.patient.history}, Symptoms: ${nextCase.patient.symptoms}. What test would you order to start our investigation?`
            });
        } else {
            socket.emit('message', {
                sender: 'seniorDoctor',
                text: "Excellent work, Dr. Shrey! You've successfully completed all the cases for today."
            });
        }
        attempts = 0;
        socket.waitingForDiagnosis = false;
    } else {
        socket.emit('message', {
            sender: 'seniorDoctor',
            text: `I'm not convinced about ${diagnosisGiven}. Let's review the patient's symptoms and test results again. What other possibilities should we consider?`
        });
    }
}

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

