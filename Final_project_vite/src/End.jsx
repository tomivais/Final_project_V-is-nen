const createSessionId = () => {
    return `session-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
};

const End = async (sessionId) => {
   
    const endtime = new Date(Date.now() + 2 * 60 * 60 * 1000);
    console.log("Endtime luotu: ", endtime);
    

    try {
        const response = await fetch(`http://localhost:3000/studies?id=${sessionId}`);
        const resp = await response.json();

        if (Object.keys(resp).length === 0) {
            console.log("Session ID:llä ei löydy aikaleimaa.");
            return { success: false, message: "Session ID:llä ei löydy aikaleimaa." };
        } else {
            // Update the session with the new pausetime
            const updateResponse = await fetch(`http://localhost:3000/studies/${sessionId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    endtime: endtime // Lisää endtime kenttä
                })
            });

            if (updateResponse.ok) {
                console.log("Endtime tallennettu onnistuneesti");
                const newSessionId = createSessionId(); // Luo uusi session ID
                return { success: true, sessionId: newSessionId };
            } else {
                console.log("Endtimen tallentaminen epäonnistui");
                return { success: false, message: "Endtimen tallentaminen epäonnistui" };
            }
        }
    } catch (error) {
        console.error("Virhe tallennuksessa: ", error);
        return { success: false, message: "Virhe tallennuksessa: " + error.message };
    }
};

export default End;
