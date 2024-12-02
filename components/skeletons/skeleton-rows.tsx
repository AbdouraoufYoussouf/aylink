import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonRowsProps {
  numRows: number;  // Nombre de lignes
  numCols: number;  // Nombre de colonnes
}

export const SkeletonRows: React.FC<SkeletonRowsProps> = ({ numRows, numCols }) => {
  return (
    <>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: numCols }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-6 w-full bg-muted" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
