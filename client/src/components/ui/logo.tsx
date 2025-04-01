export function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "h-6 w-6",
    default: "h-8 w-8",
    large: "h-10 w-10"
  };

  const textClasses = {
    small: "ml-1.5 text-lg",
    default: "ml-2 text-xl",
    large: "ml-2.5 text-2xl"
  };

  return (
    <div className="flex items-center">
      <svg className={`${sizeClasses[size]} text-primary`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path>
      </svg>
      <span className={`${textClasses[size]} font-bold text-gray-900`}>BetaBuddy</span>
    </div>
  );
}
