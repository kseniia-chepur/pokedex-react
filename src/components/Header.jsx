import { TiThMenu } from "@react-icons/all-files/ti/TiThMenu";

export const Header = ({ handleNavOpen }) => {
  return (
    <header>     
      <button className="open-nav-button" onClick={handleNavOpen}>
        <TiThMenu />
      </button>
      <h1 className="text-gragient">Pokedex</h1>

    </header>
  )
}