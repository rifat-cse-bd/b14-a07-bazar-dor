export default function Avatar({ user, className = "" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-primary font-semibold text-primary-content ${className}`}
    >
      {user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.image} alt={user.name} className="size-full object-cover" referrerPolicy="no-referrer" />
      ) : (
        (user.name || "?").charAt(0).toUpperCase()
      )}
    </span>
  );
}
