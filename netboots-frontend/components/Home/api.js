const BASE_URL = "http://localhost:8081";

export const searchShoes = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search-shoes`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),  
        });

        if (!response.ok) {
            throw new Error('Erro na resposta da API'); 
        }

        const data = await response.json();
        return data;  
    } catch (error) {
        console.error("Erro ao buscar sapatos:", error); 
        throw error;
    }
};
