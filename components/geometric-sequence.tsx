/**
 * A literal geometric sequence, used as a small ornament under the FAQ intro. Each diamond is a
 * fixed ratio larger than the one inside it (a, ar, ar², …), and alternate terms turn in opposite
 * directions, slower as they grow.
 */

const FIRST = 10; // half-diagonal of the smallest diamond, in SVG units
const RATIO = 1.42;
const TERMS = 8;

const terms = Array.from({ length: TERMS }, (_, n) => FIRST * RATIO ** n);
const EXTENT = Math.ceil(terms[TERMS - 1]) + 4;

export function GeometricSequence({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox={`${-EXTENT} ${-EXTENT} ${EXTENT * 2} ${EXTENT * 2}`} fill="none" className={className}>
      {terms.map((r, n) => (
        <g
          key={n}
          className="sequence-ring"
          style={{ "--turn": `${70 + n * 28}s`, animationDirection: n % 2 ? "reverse" : "normal" } as React.CSSProperties}
        >
          <path
            d={`M0 ${-r} L${r} 0 L0 ${r} L${-r} 0 Z`}
            stroke={n % 3 === 0 ? "var(--arc-pink)" : n % 3 === 1 ? "var(--violet)" : "var(--arc-blue)"}
            strokeOpacity={0.75 - n * 0.04}
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
          />
          {/* A marker on each term's corner, so the sequence reads as steps rather than rings */}
          <rect x={-1.6} y={-r - 1.6} width={3.2} height={3.2} transform={`rotate(45 0 ${-r})`} fill="var(--violet)" fillOpacity={0.7} />
        </g>
      ))}
    </svg>
  );
}
