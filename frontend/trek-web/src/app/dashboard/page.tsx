import Breadcrumbs from "../ui/dashboard/breadcrumbs";
import Title from "../ui/dashboard/title";

export default function Overview() {

  return (
    <div>
      <Breadcrumbs />
      <Title text="Overview"/>
      <p>Današnji trening i ostalo...</p>
    </div>
  );
}