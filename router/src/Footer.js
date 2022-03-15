
const Footer = () => {
    const today = new Date();
    return (
        <footer className="Footer">
           <p>Coppright &coppy; {today.getFullYear()}</p>
        </footer>
    )
}

export default Footer
