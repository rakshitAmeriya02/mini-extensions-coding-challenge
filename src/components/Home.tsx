import withLayout from "src/hoc/withLayout";
import { useAppSelector } from "src/store/hooks";
import { TEXT } from "src/utils/constant";

const Home = () => {
  const classes = useAppSelector((state) => state.classes);
  return (
    <div className="home">
      {classes.map((item, index) => (
        <div className="class-card" key={`card-${index + 1}`}>
          <p className="bold">{TEXT.NAME}</p>
          <p>{item.name}</p>
          <p className="bold">{TEXT.STUDENTS}</p>
          <p>{item.students.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default withLayout(Home);
