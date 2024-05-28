import { EmptyPlaceholder } from "./empty-placeholder";
import { buttonVariants } from "./ui/button";
import { PropsWithChildren } from "react";

type Props = { title: string; description: string };

export default function Empty({
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="file" />
      <EmptyPlaceholder.Title>{title}</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>{description}</EmptyPlaceholder.Description>
      {children}
    </EmptyPlaceholder>
  );
}
