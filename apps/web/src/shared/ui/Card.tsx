import type { PropsWithChildren, ReactNode } from "react";
import { classNames } from "../lib/classNames";

type CardProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}>;

export function Card({
  title,
  subtitle,
  action,
  className,
  children
}: CardProps): JSX.Element {
  return (
    <section className={classNames("card", className)}>
      {(title || subtitle || action) && (
        <header className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </header>
      )}
      <div className="card-body">{children}</div>
    </section>
  );
}

