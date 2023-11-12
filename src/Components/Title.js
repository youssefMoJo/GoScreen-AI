
const Title = () => {
    const titleStyle = {
        fontSize: "25px",
        fontFamily: "'Press Start 2P', sans-serif",
        color: "white",
        marginBottom: '13px',
    }
    const aiPowered = {
        fontFamily: "'Press Start 2P', sans-serif",
        color: "#53FC38",
        fontSize: "18px",
    }

    return (
        <div>
            <div style={titleStyle}>Welcome to Movies & TV Shows Recommender</div>
            <span style={aiPowered}>AI-Powered</span>
        </div>

    )
}

export default Title;
