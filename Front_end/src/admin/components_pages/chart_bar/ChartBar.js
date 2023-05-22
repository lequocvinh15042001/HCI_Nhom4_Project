import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function ChartBar({ data, keyXAxis, keyBar, name }) {
    return (
        <ResponsiveContainer width={'100%'} height={400}>
            <BarChart
                data={data}
                margin={{ top: 40, right: 0, bottom: 15, left: 10 }}
            >
                <XAxis dataKey={keyXAxis} />
                <YAxis />
                <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey={keyBar}
                    fill='green'
                    name={name}
                    animationDuration={1600}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ChartBar;
