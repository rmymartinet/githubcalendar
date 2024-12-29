type GridSquaresProps = {
  colors: string[];
  numCols: number;
  numRows: number;
};

const GridSquares = ({ colors, numCols, numRows }: GridSquaresProps) => {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
      }}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default GridSquares;
