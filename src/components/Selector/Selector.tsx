import { Location, LocationDict } from '../Pictures/Picture.types';
import './Selector.css';

interface SelectorProps {
  list: LocationDict
  onMouse: (name: string) => void
}

export const Selector: React.FC<SelectorProps> = ({ list, onMouse }) => {

  const content = Object.keys(list).map(value => {
    const name = list[value].name
    return (
      <li
        className="picture-name"
        onClick={() => onMouse(name)}
      >
        {name}
      </li>)
     
  })

  return (
    <div className="selector-wrapper">
      <ul className="selector">
        {content}
      </ul>
    </div>
  );
}