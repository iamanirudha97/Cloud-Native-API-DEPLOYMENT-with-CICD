#!/bin/bash -x
project_id=$1
machine_type=$2
network_tier=$3
webapp_subnet=$4
region=$5
service_account=$6
scope=$7
tags=$8
mig=$9
disk_size=${10}
disk_type=${11}
image_name=${12}
webapp_template_name=${13}
startup_script="${14}"
webapp_keyring=${15}
crypto_key=${16}

gcloud beta compute instance-templates create $webapp_template_name \
    --project=$project_id \
    --machine-type=$machine_type \
    --network-interface=network-tier=$network_tier,subnet=$webapp_subnet \
    --instance-template-region=$region \
    --metadata=startup-script="$startup_script"\
    --maintenance-policy=MIGRATE \
    --provisioning-model=STANDARD \
    --service-account=$service_account \
    --scopes=$scope \
    --region=$region \
    --tags=$tags \
    --create-disk=auto-delete=yes,boot=yes,device-name=webapp,image=projects/$project_id/global/images/$image_name,kms-key=projects/$project_id/locations/$region/keyRings/$webapp_keyring/cryptoKeys/$crypto_key,mode=rw,size=$disk_size,type=$disk_type \
    --no-shielded-secure-boot \
    --shielded-vtpm \
    --shielded-integrity-monitoring \
    --labels=environment=production \
    --reservation-affinity=any \

gcloud compute instance-groups managed rolling-action start-update $mig \
    --version=template=projects/$project_id/regions/$region/instanceTemplates/$webapp_template_name --region=$region --max-unavailable=0

gcloud compute instance-groups managed wait-until $mig \
    --version-target-reached --region=$region