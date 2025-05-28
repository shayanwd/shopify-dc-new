<?php

header("X-Robots-Tag: noindex, nofollow", true);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

// Admin email address
$adminEmail = "shayankhanwd@gmail.com";

// Function to send email
function sendEmail($data, $adminEmail)
{
    $subject = "New Contact Form Submission";

    // Build a structured email message with all form fields
    $message = "New Contact Form Submission Details:\n\n";
    $message .= "First Name: " . htmlspecialchars($data['firstName']) . "\n";
    $message .= "Last Name: " . htmlspecialchars($data['lastName']) . "\n";
    $message .= "Email: " . htmlspecialchars($data['email']) . "\n";
    $message .= "Website: " . htmlspecialchars($data['website']) . "\n";
    $message .= "Service Required: " . htmlspecialchars($data['service']) . "\n";
    $message .= "Budget Range: " . htmlspecialchars($data['budget']) . "\n";
    $message .= "Project Timeline: " . htmlspecialchars($data['timeline']) . "\n";
    $message .= "Project Details: " . htmlspecialchars($data['message']) . "\n";

    // Set up email headers
    $headers = "From: " . $data['email'] . "\r\n";
    $headers .= "Reply-To: " . $data['email'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return mail($adminEmail, $subject, $message);
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read input data
    $data = json_decode(file_get_contents('php://input'), true);

    // Send email
    $success = sendEmail($data, $adminEmail);

    if ($success) {
        // Email sent successfully
        http_response_code(200);
        echo json_encode(array("message" => "Email sent successfully.", "code" => "200"));
    } else {
        // Failed to send email
        http_response_code(500);
        echo json_encode(array("message" => "Failed to send email."));
    }
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(array("message" => "Method Not Allowed"));
}
