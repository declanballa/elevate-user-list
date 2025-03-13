import { SkillInfo } from '../models/user';
import '../styles/Skill.css';

interface SkillProps {
  name: string;
  info: SkillInfo;
  hideLabels?: boolean;
}

const Skill = ({ name, info, hideLabels = false }: SkillProps) => {
  const getSkillColor = (name: string) => {
    if (name === 'writing') {
      return '#0a91a7';
    } else if (name === 'reading') {
      return '#ff87a0';
    } else if (name === 'math') {
      return '#25973a';
    } else {
      // speaking
      return '#803b01';
    }
  };

  return (
    <li key={name} className='skill'>
      <span className='label'>{name}</span>
      <span
        className='current'
        style={{
          width: (info.current / info.max) * 100 + '%',
          backgroundColor: getSkillColor(name),
          color: hideLabels ? getSkillColor(name) : 'inherit'
        }}
      >
        {!hideLabels ? info.current : '_'}
      </span>
      <span className='max'>{!hideLabels && info.max}</span>
    </li>
  );
};

export default Skill;
