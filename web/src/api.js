export default class API {
    static getURL() {
        if (process.env.REACT_APP_API_URL) {
            return process.env.REACT_APP_API_URL;
        }
        else {
            return "http://localhost:8080/api/";
        }
    }

    static async getResponse(urlPath) {
        let url = new URL(API.getURL() + urlPath);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(response.error);
        }

        return await response.json();
    }

    static async postResponse(urlPath, body) {
        let url = new URL(API.getURL() + urlPath);

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(response.error);
        }

        return await response.json();
    }

    //Scores controller

    static async addScore(userName, score) {
        const req = {
            userName: userName,
            score: score
        };

        return API.postResponse("user/score", req);
    }

    static async getUserScores(userName) {
        return API.getResponse(`user/scores?userName=${userName}`);
    }

    static async getTop10() {
        return API.getResponse("scores/global");
    }

    //User controller

    static async getUserByName(userName) {
        return API.getResponse(`user?userName=${userName}`);
    }

    static async getUserById(id) {
        return API.getResponse(`user/${id}`);
    }

    static async createUser(userName, displayName) {
        const req = {
            userName: userName,
            displayName: displayName
        };

        return API.postResponse("user", req);
    }

    static async checkUserExists(userName) {
        let url = new URL(API.getURL() + `user?userName=${userName}`);
        const response = await fetch(url);
        return response.ok;
    }
}