export default function Ingredient({name, percentage, weight}) {
  return (
    <tr>
      <td>{name}</td>
      <td>{percentage}</td>
      <td>{weight}</td>
    </tr>
  );
}
