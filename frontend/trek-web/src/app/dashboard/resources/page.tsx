import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import Title from "@/app/ui/dashboard/title";

export default function Resources() {
    return (
        <div>
            <Breadcrumbs />
            <Title text="Resources"/>
            <div>Set resources</div>
            <p>List of resources, creatorID, url, note</p>
        </div>
    )
}