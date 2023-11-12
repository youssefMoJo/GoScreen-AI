import "../Styles/GlowingBtn.css"

const References = () => {
    const referencrsTile = {
        fontFamily: "'Press Start 2P', sans-serif",
        color: "#09F0FF",
        textAlign: "center",
    }

    return (
        <div>
            <div style={referencrsTile}>What are you in the mood for?</div>
            <div className="glowing-btn">
                <span className="glowing-txt">
                    M<span className="faulty-letter">O</span>VIES
                </span>
            </div>
       </div>
    )
}

export default References