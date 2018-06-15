# list things
kubectl get po
            svc
            deployment
            all

# apply definition
kubectl apply -f `definition_file`.yaml

# watch deployment
kubectl get po --watch
               
# full details 
kubectl get po -o wide

# deployment with version record
kubectl apply -f __.yaml --record

# follow rollout status
kubectl rollout status deployment `deployment_name`

# deployment rollout history
kubectl rollout history deployment `deployment_name`

# rollback deployment
kubectl rollout undo deployment `deployment_name` --to-revision=1

# port forward
kubectl port-forward `pod-name` 88:80