export default function Disappointment({ onNext }) {
  return (
    <div className="text-center space-y-8 py-20">
      <h2 className="text-6xl font-serif italic">Really?</h2>
      <p className="text-xl font-light text-zinc-500">Picked wrong, No bonus present for you.</p>
      <button onClick={onNext} className="mt-10 uppercase tracking-widest border-b border-current pb-2">Whatever, let's eat</button>
    </div>
  );
}