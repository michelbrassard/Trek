type TitleProps = {
    text: string;
  };

export default function Title({text}: TitleProps) {
    return(
        <h1 className="text-3xl font-bold mb-2">{text}</h1>
    )
}