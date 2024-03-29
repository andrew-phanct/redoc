package salesforce.code_samples.Java.timesheet;
String accessToken = "your_access_token_here"; // Replace with your actual access token
String apiUrl = "https://your_instance.salesforce.com/services/apexrest/TimesheetLesson/"; // Replace with your Salesforce instance API URL
String jsonInputString = "{"
        + "\"staff_id\": \"01H68QBGB6P3VNZ77SJ1QK\","
        + "\"lesson_status\": 3,"
        + "\"lesson_date\": \"2023-04-01\","
        + "\"lesson_start_time\": \"13:00\","
        + "\"lesson_end_time\": \"14:00\","
        + "\"lesson_method\": 1,"
        + "\"lesson_location\": \"ManabieTokyoOffice1\","
        + "\"remarks\": \"Student was ill\","
        + "\"linked_lesson_id\": \"Lecture123\","
        + "\"manabie_course_id\": \"Course789\""
        + "}";

try {
    URL url = new URL(apiUrl);
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json; utf-8");
    conn.setRequestProperty("Authorization", "Bearer " + accessToken);
    conn.setDoOutput(true);

    try(OutputStream os = conn.getOutputStream()) {
        byte[] input = jsonInputString.getBytes("utf-8");
        os.write(input, 0, input.length);
    }

    int responseCode = conn.getResponseCode();
    System.out.println("Response Code: " + responseCode);

} catch (Exception e) {
    e.printStackTrace();
}
