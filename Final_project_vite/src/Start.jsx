const Start = async (userId, sessionId) => {
    const starttime = new Date(Date.now() + 2 * 60 * 60 * 1000);
    console.log("Aikaleima luotu: ", starttime.toISOString());

    try {
        const response = await fetch("http://localhost:3000/studies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: sessionId, userId, starttime }) // Sisältää userId:n ja aikaleiman
        });

        if (response.ok) {
            // Tarkistaa onko vastaus JSON-muotoinen
            const data = await response.json().catch(() => {
                console.log("Vastaus ei ole JSON-muotoista");
                return null;
            });

            if (data) {
                console.log("Aikaleima tallennettu onnistuneesti");
                return { success: true, data };
            } else {
                return { success: false, message: "Vastauksen muotoiluvirhe" };
            }
        } else {
            console.log("Aikaleiman tallentaminen epäonnistui");
            return { success: false, message: "Aikaleiman tallentaminen epäonnistui" };
        }
    } catch (error) {
        console.error("Virhe tallennuksessa: ", error);
        return { success: false, message: "Virhe tallennuksessa: " + error.message };
    }
};

export default Start;
