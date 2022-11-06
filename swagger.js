const swaggerAutogen = require("swagger-autogen")()
 
const doc = {
    info: {
        version: "1.0.0",
        title: "Altsschool (My examination project) API",
        description: "API  for blogging ."
    },
    host: "localhost:5000",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "Auth",
            "description": "Auth endpoints"
        },
        {
            "name": "Posts",
            "description": "Posts endpoints"
        },
    ],
    securityDefinitions: {
        Authorization: {
            type: "apiKey",
            name: "Authorization",
            description: "Value: Bearer ",
            in: "header",
            scheme: 'bearer'
        }
    },
    definitions: {
        LoginModel: {
            $email: "rasheedolayanju1@gmail.com",
            $password: "Password123#",            
        },
        RegisterModel: {
            $name: "Ali Abu",
            $email: "aliabu@mail.com",
            $password: "Password123#", 
        },
        UpdateUserModel: {
            $name: "Ali Abu",
        },
        StoryModel: {
            $category: "6064e654b5c7475bac63ad22",
            $title: "Elon Musk Admits He Wants to Travel to Mars Because No One Hates Him There Yet",
            $body: "AUSTIN, Texas — Wiping tears from his eyes at a recent press conference, SpaceX CEO Elon Musk revealed that the reason he’s so keen on traveling to Mars is not for the potential benefits to science, but because it’s the one place he can think of where no one hates him yet.",
        },
        VerifyEmailModel: {
            $code: 333333,
        }, 
        ChangePasswordModel: {
            $oldPassword: "Password123#",
            $newPassword: "Password789#",
        }, 
    }
};
 
const outputFile = "./swagger_output.json";
const endpointFiles = ["./routes/index.js"];
 
swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require("./index");
});