import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const watchDetails = [
  { attribute: "Department", value: "Men" },
  { attribute: "Dial Colour", value: "Blue" },
  { attribute: "Case Size/Diameter", value: "42 mm" },
  { attribute: "Face Material", value: "Stainless Steel" },
  { attribute: "Feature 1", value: "Water Resistant" },
  { attribute: "Model Number", value: "1514093" },
  { attribute: "Band Closure", value: "Clasp" },
  { attribute: "Band Colour", value: "Silver" },
  { attribute: "Band Material", value: "Stainless Steel" },
  { attribute: "Face/Dial Shape", value: "Round" },
  { attribute: "Face/Dial Type", value: "Analog" },
  { attribute: "Watch Movement", value: "Quartz" },
];
const Mytable = () => {
  return (
    <div className="min-h-screen md:min-h-[70vh]  bg-main flex justify-center items-center px-4 h-full mt-6 text-pretty">
      <Card className="w-full max-w-4xl m-auto ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Watch Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Attribute</TableHead>
                  <TableHead className="w-1/2">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {watchDetails.map((detail) => (
                  <TableRow key={detail.attribute}>
                    <TableCell className="font-medium">
                      {detail.attribute}
                    </TableCell>
                    <TableCell>{detail.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mytable;
