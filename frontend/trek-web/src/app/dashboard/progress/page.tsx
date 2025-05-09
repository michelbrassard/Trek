import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import Title from "@/app/ui/dashboard/title";

export default function Progress() {
    return (
        <div>
            <Breadcrumbs />
            <Title text="Progress"/>
            <div>Individual progress... This is not a page for coaches, that one will be Team progress or something like that.</div>
        </div>
    )
}