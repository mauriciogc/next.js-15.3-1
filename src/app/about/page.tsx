// src/app/about/page.tsx
import { team } from './_helpers/getTeam';

export default function AboutPage() {
  return (
    <div className="container">
      <ul>
        {team.map((name) => (
          <li key={name} className="subTitle">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
