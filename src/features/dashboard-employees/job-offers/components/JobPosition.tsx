"use client";

import { useJobPositions } from "../hooks/useJobPosition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { JobPosition } from "../validations/job-position.validations";
import { Button } from "@/components/ui/button";

export default function JobPositionsPage() {
  const { data, isLoading } = useJobPositions();
  const [selected, setSelected] = useState<JobPosition | null>(null);

  console.log(data);

  return (
    <section className="max-w-7xl mx-auto mt-10 space-y-8">
      <h1 className="text-2xl font-bold text-primary">
        Postulaciones Disponibles
      </h1>

      {isLoading ? (
        <p>Cargando cargos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((position) => (
            <Dialog
              key={position.jobPositionId}
              onOpenChange={(open) => !open && setSelected(null)}
            >
              <DialogTrigger asChild>
                <Card
                  onClick={() => setSelected(position)}
                  className="cursor-pointer hover:shadow-lg transition"
                >
                  <CardHeader>
                    <CardTitle>{position.jpbPosition}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Haz clic para ver más información.
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogTitle></DialogTitle>
              <DialogContent>
                <h2 className="text-xl font-bold mb-4">
                  {selected?.jpbPosition}
                </h2>
                <p className="text-muted-foreground mb-4">
                  En el futuro aquí irán requisitos, responsabilidades y un
                  botón para postularse.
                </p>
                <Button disabled>Postularme</Button>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </section>
  );
}
