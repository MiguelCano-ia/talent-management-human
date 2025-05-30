"use client"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHabilities } from "../hooks/useHabilities";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useCourses } from "../hooks/useCourses";
import { Course, courseSchema, Habilities } from "../validations/validations.service";
import { useCreateCourse } from "../hooks/useCreateCourse";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { set } from "date-fns";
import { use, useState } from "react";


type CourseSkillsDialogProps = {
    habilities: number[];
}

type DateRange = {
    from: Date | undefined;
    to: Date | undefined;
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

function AddCourseDialog() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        clearErrors,
    } = useForm<Course>({
        resolver: zodResolver(courseSchema),
        mode: "onChange",
    });
    const [getDateRange, setDateRange] = useState<DateRange>({
        from: undefined,
        to: undefined,
    });
    const { data: skillsOld, isLoading } = useHabilities();
    const [skills, setSkill] = useState<Habilities[]>((skillsOld || []).map(i => {
        return {
            ...i,
            isActive: false
        }
    }));
    const mutation = useCreateCourse();
    const onSubmit = async (data: Course) => {
        console.log("Form data:", data);
        // mutation.mutate(data);
    }
    return (
        <Dialog onOpenChange={() => { }}>
            <DialogTrigger asChild>
                <Button className="p-2 bg-primary text-white hover:bg-primary/90 cursor-pointer">
                    Agregar Curso
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Habilidades del Curso</DialogTitle>
                <DialogDescription>
                    Lista de habilidades asociadas a este curso.
                </DialogDescription>
                <form className="w-full">
                    <div className="flex flex-col gap-4">
                        <div>
                            <Label htmlFor="name" className="mb-2">
                                Nombre
                            </Label>
                            <Input
                                {...register("name")}
                                id="name"
                                placeholder="Nombre del curso"
                                onChange={(e) => {
                                    setValue("name", e.target.value);
                                    clearErrors("name");
                                }}
                            />
                            {errors.name && (
                                <p className="text-destructive text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="startDate" className="mb-2">
                                Fechas del curso
                            </Label>
                            <div className="w-full flex justify-center gap-2 mt-2">
                                <Calendar
                                    mode="range"
                                    selected={
                                        getDateRange
                                    }
                                    onSelect={(value: any) => {
                                        if (value) {
                                            console.log(value.from, value.to);
                                            setDateRange(value);
                                            setValue("startDate", value.from?.toISOString() || "");
                                            setValue("endDate", value.to?.toISOString() || "");
                                            clearErrors("startDate");
                                            clearErrors("endDate");
                                        }
                                    }}
                                />
                            </div>
                            {errors.startDate && (
                                <p className="text-destructive text-sm">
                                    {errors.startDate.message}
                                </p>
                            )}
                        </div>
                        <div>
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
                                                <th className="px-4 py-2">Agregar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {skills?.map((skill: any, idx: number) => {
                                                return (
                                                    <tr key={idx} className="border-t">
                                                        <td className="px-4 py-2">{skill?.name}</td>
                                                        <td className="px-4 py-2">
                                                            <Switch
                                                                id="isActive"
                                                                checked={skill.isActive}
                                                                onCheckedChange={(checked) => {
                                                                    const updatedSkills = skills.map((s: any) => {
                                                                        if (s.id === skill.id) {
                                                                            return { ...s, isActive: checked };
                                                                        }
                                                                        return s;
                                                                    });
                                                                    setSkill(updatedSkills);
                                                                    const currentSkills = getValues("habilities") || [];
                                                                    if (checked) {
                                                                        setValue("habilities", [...currentSkills, skill.id]);
                                                                    } else {
                                                                        setValue("habilities", currentSkills.filter(id => id !== skill.id));
                                                                    }
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <div className="mt-4 flex justify-end">
                                <Button
                                    onClick={()=>{
                                        console.log("Skills selected:", getValues("habilities"));
                                    }}
                                    className="bg-primary text-white hover:bg-primary/90"
                                >
                                    {mutation.isPending ? "Creando..." : "Crear Curso"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function AdminCourses() {
    const { data: courses, isLoading } = useCourses();

    return (
        <section>
            <div className="flex items-center justify-end w-full">
                <AddCourseDialog />
            </div>
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
                                <th className="px-4 py-2">vincular</th>
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