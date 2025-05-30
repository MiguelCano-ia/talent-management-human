"use client"
import { Button } from "@/components/ui/button";
import { useUserCourses } from "../hooks/useUserCourses";
import { useHabilities } from "../hooks/useHabilities";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'


type CourseSkillsDialogProps = {
    habilities: number[];
}

function CourseSkillsDialog({ habilities }: CourseSkillsDialogProps) {
    const { data: skills, isLoading } = useHabilities();
    return (
        <Dialog onOpenChange={() => { }}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">Ver Habilidades</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Habilidades del Curso</DialogTitle>
                <DialogDescription>
                    Lista de habilidades asociadas a este curso.
                </DialogDescription>
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full rounded-md" />
                        ))}
                    </div>
                ) : (
                    <div className="border rounded-md overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-2">Nombre</th>
                                    <th className="px-4 py-2">Peso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {habilities?.map((hability, idx) => {
                                    const skill = skills?.find(skill => skill.habilityId === hability);
                                    return (
                                        <tr key={idx} className="border-t">
                                            <td className="px-4 py-2">{skill?.name}</td>
                                            <td className="px-4 py-2">{skill?.weight}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export function UserCourses() {
    const { data: courses, isLoading } = useUserCourses();

    return (
        <section>
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-md" />
                    ))}
                </div>
            ) : (
                <div className="border rounded-md overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Fecha comienzo</th>
                                <th className="px-4 py-2">Fecha finalización</th>
                                <th className="px-4 py-2">Habilidades</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses?.map((emp, idx) => (
                                <tr key={idx} className="border-t">
                                    <td className="px-4 py-2">{emp.name}</td>
                                    <td className="px-4 py-2">{emp.startDate}</td>
                                    <td className="px-4 py-2">{emp.endDate}</td>
                                    <td className="px-4 py-2">
                                        <CourseSkillsDialog habilities={emp.habilities} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}