import withLayout from "src/hoc/withLayout";
import { useAppSelector } from "src/store/hooks";

const Home = () => {
  const classes = useAppSelector((state) => state.classes);
  return (
    <div className="home">
      {classes.map((item, index) => (
        <div className="class-card" key={`card-${index + 1}`}>
          <p className="bold">Name</p>
          <p>{item.name}</p>
          <p className="bold">Students</p>
          <p>{item.students.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default withLayout(Home);
