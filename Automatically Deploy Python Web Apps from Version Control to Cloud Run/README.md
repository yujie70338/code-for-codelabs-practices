REF : https://codelabs.developers.google.com/codelabs/deploy-from-github/python?hl=en#0

cat > requirements.txt << EOF
Flask==3.0.0 
gunicorn==20.1.0 
EOF

touch main.py