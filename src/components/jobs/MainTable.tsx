
import React, { useState, useMemo } from 'react';
import AggregatedJobTitlesTable from './AggregatedJobTitlesTable';
import jobData from '../../data/data.json';

interface YearStats {
    year: number;
    totalJobs: number;
    avgSalary: number;
}

const MainTable: React.FC = () => {
    const [sortBy, setSortBy] = useState<keyof YearStats>('year');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const handleSort = (column: keyof YearStats) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleRowClick = (year: number) => {
        setSelectedYear(year);
    };

    const sortedJobData = useMemo(() => {
        const stats = jobData.reduce((acc, job) => {
            if (!acc[job.work_year]) {
                acc[job.work_year] = { totalJobs: 0, totalSalary: 0 };
            }
            acc[job.work_year].totalJobs += 1;
            acc[job.work_year].totalSalary += job.salary_in_usd;
            return acc;
        }, {} as Record<number, { totalJobs: number, totalSalary: number }>);

        const rows: YearStats[] = Object.keys(stats).map(year => ({
            year: Number(year),
            totalJobs: stats[Number(year)].totalJobs,
            avgSalary: stats[Number(year)].totalSalary / stats[Number(year)].totalJobs,
        }));

        return rows.sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1;
            if (a[sortBy] < b[sortBy]) return -1 * order;
            if (a[sortBy] > b[sortBy]) return 1 * order;
            return 0;
        });
    }, [sortBy, sortOrder]);

    return (
        <div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('year')} className="cursor-pointer p-2 border">Year</th>
                        <th onClick={() => handleSort('totalJobs')} className="cursor-pointer p-2 border">Number of total jobs</th>
                        <th onClick={() => handleSort('avgSalary')} className="cursor-pointer p-2 border">Average salary in USD</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedJobData.map((row) => (
                        <tr key={row.year} onClick={() => handleRowClick(row.year)} className="cursor-pointer">
                            <td className="p-2 border text-center">{row.year}</td>
                            <td className="p-2 border text-center">{row.totalJobs}</td>
                            <td className="p-2 border text-center">${row.avgSalary.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedYear !== null && <AggregatedJobTitlesTable year={selectedYear} jobData={jobData} />}
        </div>
    );
};

export default MainTable;
