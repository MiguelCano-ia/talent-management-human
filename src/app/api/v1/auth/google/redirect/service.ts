export class GoogleAuthService {
    private url: string = "http://localhost:3001/api/v1/auth/google/redirect";

    public async getToken(request: Request): Promise<string> {
        const info: string = request.url.split("?")[1] || "";
        const response = await fetch(`${this.url}?${info}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch token from Google auth redirect");
        }
        
        const data = await response.text();
        console.log("Google Auth Token Data:", data);
        return data; 
    }
}