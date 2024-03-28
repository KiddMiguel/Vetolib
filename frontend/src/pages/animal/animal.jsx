export default function Animal() {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Owner</th>
            <th>Cabinet</th>
            <th>Animal Name</th>
            <th>Animal Type</th>
            <th>Race</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-bold"  >Jokast</td>
            <td className="font-bold">Goldy</td>
            <td>Cabinet Bob</td>
            <td>Chien</td>
            <td>Golden Retriever</td>
            <td>10 ans</td>
            <td>
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12"><img style={{ width: "50px" }} src="../../../public/img/Goldy.jpg" alt="" />
                </div>
              </div>
            </td>

            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
// export default Animal;
