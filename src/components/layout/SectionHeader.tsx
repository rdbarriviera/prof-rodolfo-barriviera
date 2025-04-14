import { FC } from "react";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[var(--primary-color)]">
      {title}
    </h2>
  );
};

export default SectionHeader;
