export default function UserCard(props: any){
  return (
    <>
      <div className="border border-gray-300 shadow-md rounded-lg w-100 flex flex-col items-start p-4 bg-white m-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          ID equipo: <span className="font-normal">{props?.team_id}</span>
        </h3>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Nombre equipo: <span className="font-normal">{props?.name}</span>
        </h3>
        <h3 className="text-lg font-semibold text-gray-700">
          Miembros: <span className="font-normal">{props?.users.length}</span>
        </h3>
      </div>
    </>
  );
}
