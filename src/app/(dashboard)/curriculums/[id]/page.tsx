import CurriculumViewManagement from "@/features/curriculum-management/views";
import { session } from "@/lib/settings";

const CurriculumDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { user } = session;
  const { id } = await params;
  if (user.roleType === "ADMIN") return <CurriculumViewManagement role={user.roleType} detail={true} id={id} />
}

export default CurriculumDetailPage;