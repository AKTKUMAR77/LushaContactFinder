import express from "express"
import axios from "axios"
import cors from "cors"
import "dotenv/config"
import fetch from 'node-fetch';

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("API is Working");
})

async function run(linkedin) {
  const resp = await fetch(
    `https://api.lusha.com/v3/contacts/search-and-enrich`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_key: process.env.LUSHA_API_KEY
      },
      body: JSON.stringify({
        contacts: [
          {
            clientReferenceId: '',
            linkedinUrl: linkedin
          }
        ],
        reveal: ['emails', 'phones'],
        options: {
          includePartialProfiles: true
        }
      })
    }
  );

  const data = await resp.json();
  return data;
}


app.post("/api/findcontact", async (req, res) => {
    try {
        const { linkedin } = req.body;

        console.log("LinkedIn:", linkedin);

        const data = await run(linkedin);

        res.json(data);
        console.log(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to find contact"
        });
    }
});

app.post("/api/dummy", async (req, res) => {
    return res.json({
        "requestId": "2fc784b2-5e05-4cf0-b817-d82e5573b39e",
    "results": [
        {
            "clientReferenceId": "",
            "id": "v1.i_SLKnzVDCJDqJbNS6p6Pez64V_iUqrkuQ",
            "emails": [
                {
                    "email": "fahd.khan@exlservice.com",
                    "type": "work",
                    "confidence": "A+",
                    "updateDate": "2026-09-25",
                    "dataSource": "lusha"
                }
            ],
            "phones": [
                {
                    "number": "+91 97172 43166",
                    "type": "mobile",
                    "doNotCall": false,
                    "countryIso2": "IN",
                    "updateDate": "2026-09-25",
                    "dataSource": "lusha"
                }
            ],
            "firstName": "Fahd",
            "lastName": "Khan",
            "fullName": "Fahd Khan",
            "updateDate": "2026-09-25",
            "linkedinConnections": 501,
            "linkedinFollowers": 5631,
            "partialProfile": false,
            "jobTitle": {
                "title": "Campus Recruiting Manager",
                "seniority": "Manager",
                "startDate": "2022-10-01"
            },
            "company": {
                "id": "v1.pqoBifxMNsbYeKJhNes5iwGoBEufbE-T",
                "name": "EXL",
                "domain": "www.exlservice.com",
                "industry": "Business Services"
            },
            "location": {
                "country": "India",
                "countryIso2": "IN",
                "state": "Haryāna",
                "stateCode": "HR",
                "city": "Gurgaon",
                "continent": "Asia",
                "coordinates": [
                    77.02635192871094,
                    28.460100173950195
                ],
                "isEuContact": false
            },
            "socialLinks": {
                "linkedin": "https://www.linkedin.com/in/mohdfahdkhan"
            },
            "previousEmployment": [
                {
                    "company": {
                        "name": "EXL",
                        "domain": "exlservice.com"
                    },
                    "jobTitle": {
                        "departments": [
                            "Operations"
                        ],
                        "title": "Assistant Manager",
                        "seniority": "Non-Manager"
                    }
                }
            ]
        }
    ],
    "billing": {
        "creditsCharged": 1,
        "resultsReturned": 1,
        "lowBalance": false
    }
    });
});


app.listen(PORT,()=>{console.log("Server Started on Port : ",PORT)});