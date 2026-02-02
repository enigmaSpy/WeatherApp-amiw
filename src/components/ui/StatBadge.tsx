interface StatBadgeProp{
    icon: any;
    desc: string;
    stat: string;
}
export const StatBadge = ({icon,desc,stat}:StatBadgeProp) => {
  return (
    <div>
        <div>
            {icon}
        </div>
        <div>
            <p>{desc}</p>
            <p>{stat}</p>
        </div>
    </div>
  )
}
