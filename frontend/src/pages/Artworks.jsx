import Section from "../components/sections/Section";
import CategoryCardSmall from "../ui/CategoryCardSmall";
import PageHeader from "../ui/PageHeader";
import PosterBlock from "../ui/PosterBlock";
import { categories } from "../data";
import FilterSort from "../ui/FilterSort";
import SortComponent from "../ui/SortComponent";

function Artworks() {
  return (
    <div className="page">
      <PageHeader title="Collect artworks" subtitle="Browse by Categories" />

      <Section type="basic">
        <PosterBlock>
          {categories.map(
            (category, i) =>
              i <= 5 && (
                <CategoryCardSmall category={category} key={category.id} />
              )
          )}
        </PosterBlock>
      </Section>

      <FilterSort>
        {/* <SortComponent /> */}
        <h1>filter component</h1>
        <SortComponent />
      </FilterSort>

      <Section>
        <h1>Sort compo</h1>
      </Section>
    </div>
  );
}

export default Artworks;
