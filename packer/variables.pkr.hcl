variable project_id {
  type        = string
  description = "project id for the gcp account"
}

variable zone {
  type = string
}

variable image_name {
  type = string
}

variable source_image_family {
  type = string
}

variable machine_type {
  type = string
}
variable ssh_username {
  type = string
}

// variable pg_password {
//   type = string
// }