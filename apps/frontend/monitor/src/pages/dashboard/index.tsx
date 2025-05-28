// import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { useAppList } from '@/api/app';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { DataTable } from '@/components/data-table';

// import { SectionCards } from '@/components/section-cards';

export default function Page() {
  const { data } = useAppList();
  return (
    <div className="grid gap-4 p-4 md:gap-6 md:p-6">
      {/* <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div> */}
      {/* <DataTable data={data} /> */}
      <div className="grid grid-cols-3 gap-6">
        {data?.map((item) => (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.appType}</p>
              <p className="truncate">{item.appId}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
