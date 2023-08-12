use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class ExcelController extends Controller
{
    public function import(Request $request)
    {
        $file = $request->file('file');

        // Read the Excel file using Maatwebsite\Excel
        $rows = Excel::toArray([], $file);

        if (count($rows) > 0) {
            $dataRows = $rows[0];

            foreach ($dataRows as $row) {
                // Access the data from each row
                $column1Value = $row['column1'];
                $column2Value = $row['column2'];

                // Perform the necessary actions with the extracted data
                // For example, update the database with the extracted values
                DB::table('your_table')->insert([
                    'column1' => $column1Value,
                    'column2' => $column2Value,
                ]);
            }
        }

        // Return a response or perform any other actions
        return response()->json(['message' => 'File imported successfully']);
    }
}
