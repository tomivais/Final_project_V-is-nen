const CreateSessionId = () => {
    return `session-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
};

export default CreateSessionId;