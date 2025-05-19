export default function SkillsOverview() {
  return(
    <div className="flex items-center justify-center">
        <CircularMenu />
    </div>
  );
}


const CircularMenu = ({ items = ["A", "B", "C"], radius = 230 }) => {
  const angleStep = 360 / items.length;

  return (
    <div
      className="relative m-5 rounded-full border-2 border-neutral-500/30"
      style={{ width: radius * 2, height: radius * 2 }}
    >
        {items.map((item, index) => {
            const angle = angleStep * index;
            const x = radius + radius * Math.sin((angle * Math.PI) / 180) - 75;
            const y = radius + radius * -Math.cos((angle * Math.PI) / 180) - 70;

            return (
                <div
                    key={index}
                    className="absolute z-10"
                    style={{
                        left: x,
                        top: y,
                    }}
                >
                    <div
                        className="w-[150px] h-[150px] bg-blue-500 text-white rounded-xl flex items-center justify-center transition-colors duration-200 hover:bg-blue-400 cursor-pointer"
                        style={{
                            transform: `rotate(${angle}deg)`,
                            transformOrigin: "center center",
                        }}
                    >
                        <p
                            style={{
                                transform: `rotate(${-angle}deg)`,
                                transformOrigin: "center center",
                            }}
                        >
                            {item}
                        </p>
                    </div>
                </div>
            );
            })}
        <div
            className="w-full h-full absolute flex items-center justify-center text-center text-neutral-500"
        >
            Skills
        </div>
    </div>
  );
};