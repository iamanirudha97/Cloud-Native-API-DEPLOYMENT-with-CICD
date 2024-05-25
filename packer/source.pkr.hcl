source "googlecompute" "centOS" {
  project_id           = var.project_id
  image_name           = "${var.image_name}-${local.current_time}"
  source_image_family  = var.source_image_family
  zone                 = var.zone
  machine_type         = var.machine_type
  ssh_username         = var.ssh_username
  wait_to_add_ssh_keys = "20s"
  tags                 = ["packer"]
}

locals {
  current_time = lower(formatdate("DD-MMM-YY-hh-mm", timestamp()))
}
